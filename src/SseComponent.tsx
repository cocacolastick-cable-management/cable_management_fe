import React, { useEffect, useState } from 'react';

const SseComponent: React.FC = () => {
   const [messages, setMessages] = useState<string[]>([]);

   useEffect(() => {
      const eventSource = new EventSource('http://localhost:8000/sse/connection/?client_id=123');

      eventSource.onopen = () => {
         console.log('SSE connection opened');
      };

      eventSource.onerror = (error) => {
         console.error('SSE error:', error);
      };

      eventSource.onmessage = (event) => {
         console.log("event")
         setMessages((prevMessages) => [...prevMessages, event.data]);
      };

      return () => {
         eventSource.close(); // Close the SSE connection when component unmounts
      };
   }, []);

   return (
      <div>
         <h1>Server-Sent Events</h1>
         <ul>
            {messages.map((message, index) => (
               <li key={index}>{message}</li>
            ))}
         </ul>
      </div>
   );
};

export default SseComponent;