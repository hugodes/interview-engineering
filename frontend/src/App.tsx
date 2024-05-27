import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Button,
    Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

function App() {
  const [model, setModel] = React.useState('');
  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState('');
  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrompt(event.target.value)
  }

  const submit = () => {
    // Call the API
    fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ model: model, prompt: prompt }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
          setResponse(data.completion)
          console.log(data);
      });
  }
  return (
      <div className="App">
          <Container>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Model</InputLabel>
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
              <TextField label="Ask your question" variant="standard" focused multiline rows={4} onChange={handlePromptChange}/>
            </FormControl>
          </Container>
          <Container>
            <Button onClick={submit} variant="contained">Submit</Button>
          </Container>
          <Container>
              {response && <p>{response}</p>}
          </Container>

      </div>
  );
}

export default App;
