import { WebSocketServerUrl } from "@/config/config";
import { ChatMessage } from "@/store/ChatSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/ChatSlice";
import { toast } from "sonner";

const useWebSocket = (userId: string) => {
  const [socketConnection, setSocketConnection] = useState<WebSocket | null>();

  const dispatch = useDispatch();

  //for making sure that useeffect run once
  const effectCalled = useRef<boolean>(false);

  useEffect(() => {
    const newSocket = new WebSocket(`${WebSocketServerUrl}?id=${userId}`);

    newSocket.onopen = () => {
      console.log("connection is established");
      toast.success('connection is established')
      setSocketConnection(newSocket);
    };

    newSocket.onmessage = (data: MessageEvent<string>) => {
      const parsedData: ChatMessage = JSON.parse(data.data);
      console.log(`Message received: ${parsedData.message}`);

      // if (parsedData.error) {
      //   console.error(parsedData.error);
      //   return;
      // }

      dispatch(addMessage(parsedData));
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setSocketConnection(null);
    };

    newSocket.onerror = (error)=>{
        setSocketConnection(null);
        toast.error("Connection cannot be established")
    }
    

    return () => {
      newSocket.close();
    };
  }, []);

  return { socket: socketConnection };
};

export default useWebSocket;
