import React, {useEffect} from 'react';

function App() {
  const ws: any = new WebSocket('ws://localhost:8000');
  useEffect(() => {
    ws.onopen = () => {
      console.log('Connected!');
      ws.send('HELLO?');
    };

    ws.onmessage = (evt: MessageEvent) => {
      console.log(evt);
      console.log(evt.data);
    };
  });

  const handleSendMessage = (message: string, payload: string) => {
    let payloadCopy: any = {};
    if (payload !== undefined && payload !== null) {
      const key: number = parseInt(payload);
      payloadCopy[0] = key;
    }

    payloadCopy['__MESSAGE__'] = message;
    ws.send(JSON.stringify(payloadCopy));
    console.log(ws);
  };

  return (
    <div>
      <button onClick={() => handleSendMessage('message', '123123')}>
        Message 보내기
      </button>
    </div>
  );
}

export default App;
