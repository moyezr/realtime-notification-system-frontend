"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IncomingMessage } from "@/types/IncomingMessage";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Frown, Loader2 } from "lucide-react";

const pingUser = (ws: WebSocket, from: string, to: string = "all") => {
  if (to == "all") {
    ws.send(
      JSON.stringify({
        type: "pingAll",
        from: from,
      })
    );
  } else {
    ws.send(
      JSON.stringify({
        type: "pingUser",
        from: from,
        to: to,
      })
    );
  }
};

const PingBoard = ({ session }: { session: Session | null }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<{
    [k: string]: string;
  } | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}?id=${session?.user?.id}&name=${session?.user?.name}`
    );

    ws.onopen = () => {
      setIsConnected(ws.readyState === WebSocket.OPEN);
      setSocket(ws);
    };

    ws.onmessage = (ev) => {
      const message = ev.data;

      try {
        const parsedMessage: IncomingMessage = JSON.parse(message);
        console.log("parsed message", parsedMessage);
        if (parsedMessage.type == "connectedUsers") {
          setConnectedUsers(parsedMessage.connectedUsers || null);
        }

        if (parsedMessage.type == "ping") {
          toast({
            title: `${parsedMessage.sender} pinged you`,
          });
        }
      } catch (error) {}
    };

    ws.onerror = () => {
      setError(true);
    };
    return () => {
      ws.close();
    };
  }, []);

  if (error) {
    return (
      <>
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Frown className="text-rose-500 h-24 w-24" />
            <p className="text-4xl font-bold md:text-5xl text-rose-500">
              Error Connecting WS Backend
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!isConnected) {
    return (
      <>
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin h-24 w-24" />
            <p className="text-4xl font-bold md:text-5xl">Connecting...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {connectedUsers ? (
          Object.entries(connectedUsers).map((user, i) => {
            if (user[0] != session?.user?.id) {
              return (
                <Card key={i} className="w-full text-center">
                  <CardHeader>
                    <CardTitle>{user[1]}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex items-center justify-end">
                    <Button
                      onClick={() => {
                        pingUser(socket!, session?.user?.id!, user[0]);
                      }}
                      className="ml-auto"
                    >
                      Ping!
                    </Button>
                  </CardContent>
                </Card>
              );
            }
          })
        ) : (
          <p className="text-2xl">No Connected Users</p>
        )}
      </div>

      <Button
        className="text-3xl mb-10 mx-auto"
        onClick={() => {
          pingUser(socket!, session?.user?.id!, "all");
        }}
      >
        Ping All Users
      </Button>

      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
    </>
  );
};

export default PingBoard;
