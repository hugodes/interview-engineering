import React, { useEffect, useState } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
  CircularProgress,
  FormHelperText,
} from '@mui/material';

function App() {
  const [model, setModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3002');
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      setResponse((prevResponse) => prevResponse + event.data);
    };

    newSocket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const submit = () => {
    setLoading(true); // Set loading to true when the API call starts
    if (socket && isConnected) {
      socket.send(JSON.stringify({ type: 'startChat', question: prompt }));
    } else {
      console.error('WebSocket is not connected');
    }
    setLoading(false); // Set loading to false when the API call completes
  };

  return (
    <div className="App">
      <Container>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="model-select-label">Model</InputLabel>
          <Select
            labelId="model-select-label"
            id="model-select"
            value={model}
            label="Model"
            onChange={handleModelChange}
          >
            <MenuItem value={10}>gpt-4-turbo-preview</MenuItem>
            <MenuItem value={20}>gpt-4</MenuItem>
            <MenuItem value={30}>gpt-3.5-turbo</MenuItem>
          </Select>
          <FormHelperText>Choose your chatgpt model</FormHelperText>
        </FormControl>
      </Container>
      <Container>
        <FormControl sx={{ m: 1, minWidth: 400 }}>
          <TextField
            label="Ask your question"
            variant="standard"
            focused
            multiline
            rows={4}
            onChange={handlePromptChange}
          />
        </FormControl>
      </Container>
      <Container>
        <Button onClick={submit} variant="contained" disabled={loading || !isConnected}>
          Submit
        </Button>
        {loading && <CircularProgress sx={{ ml: 2 }} />}
      </Container>
      <Container>{response && <p>{response}</p>}</Container>
    </div>
  );
}

export default App;
