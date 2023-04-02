import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
import TextWithCode from "./text_with_code";
import "./chat.scss";
import { BotSelfIntro, MessageApi } from "./consts";

interface Message {
  role: string;
  content: string;
  uuid: string;
}

interface Record {
  messages: Message[];
  title: string;
  key: string;
}

async function chatApi(messages: Message[]) {
  const response = await fetch(MessageApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: messages.map(({ role, content }) => ({
        role,
        content,
      })),
    }),
  });
  return response;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState("新对话");
  const [recordKey, setRecordKey] = useState(new Date().toLocaleString());
  const [history, setHistory] = useState<Record[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isUpdatingTitle, setIsUpdatingTitle] = useState(false);

  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setHistory(JSON.parse(localStorage.history || "[]"));
  }, []);

  const saveHistory = () => {
    if (messages.length === 0) return;
    const curr: Record = {
      messages,
      title,
      key: recordKey,
    };
    const newHistory = [curr, ...history.filter(({ key }) => key !== curr.key)];
    setHistory(newHistory);
    localStorage.history = JSON.stringify(newHistory);
  };

  const loadHistory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.target as HTMLElement;
    const selectedKey = element.getAttribute("data-key");
    const toLoad: Record = selectedKey
      ? history.filter(({ key }) => key === selectedKey)[0]
      : { messages: [], title: "新对话", key: new Date().toLocaleString() };

    setMessages(toLoad.messages);
    setTitle(toLoad.title);
    setRecordKey(toLoad.key);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const updateChatTitle = async () => {
    setIsUpdatingTitle(true);
    try {
      const response = await chatApi([
        ...messages,
        {
          role: "user",
          content:
            "总结我们的对话作为标题，尽量简短，不超过10个汉字。直接回复标题本身，不要有其他内容。",
          uuid: "",
        },
      ]);
      setTitle(await response.text());
      saveHistory();
    } catch (error) {
      setErrorMessage(`总结对话出错了: ${error}`);
    } finally {
      setIsUpdatingTitle(false);
    }
  };

  const handleSubmit = async () => {
    if (!input) {
      return;
    }
    const newMessage: Message = {
      role: "user",
      content: input,
      uuid: uuidv4(),
    };
    const botMessage = {
      role: "assistant",
      content: "",
      uuid: uuidv4(),
    };

    setMessages([...messages, newMessage, botMessage]);
    setInput("");
    setErrorMessage("");

    setIsAnswering(true);
    try {
      const response = await chatApi([...messages, newMessage]);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let result = null;
      do {
        // eslint-disable-next-line no-await-in-loop
        result = await reader.read();
        const partText = decoder.decode(result.value);
        botMessage.content += partText;
        setMessages([...messages, newMessage, botMessage]);
      } while (result && !result.done);
    } catch (error) {
      setErrorMessage(`出错了: ${error}`);
      setMessages(messages);
      setInput(input);
    } finally {
      setIsAnswering(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!isAnswering) {
      saveHistory();
      if (messages.length % 10 === 6) updateChatTitle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnswering]);

  useEffect(() => {
    if (!isUpdatingTitle) {
      saveHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatingTitle]);

  return (
    <div className="chat">
      <div className="message p-3 mb-4 border">
        <p>{BotSelfIntro}</p>
      </div>
      <Row className="chat-manager align-items-center">
        <Col xs="6" md="auto" className="mb-3">
          <DropdownButton title="历史聊天记录">
            <Dropdown.Item onClick={loadHistory}>新建对话</Dropdown.Item>
            <Dropdown.Divider />
            {history.map((r) => (
              <Dropdown.Item key={r.key} onClick={loadHistory} data-key={r.key}>
                {r.key} | {r.title}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        {messages.length > 6 && (
          <Col xs="6" md="auto" className="mb-3">
            <Button
              onClick={updateChatTitle}
              disabled={isUpdatingTitle || isAnswering}
              variant="secondary"
            >
              重新生成标题
            </Button>
          </Col>
        )}
        <Col className="text-center mb-3">
          <b>
            {title} -- {recordKey}
          </b>
        </Col>
      </Row>
      <div className="messages">
        {messages.map((message) => {
          return (
            <div
              className={`message message__${message.role} border rounded my-3 p-2`}
              key={message.uuid}
            >
              {message.content ? (
                <TextWithCode text={message.content} />
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </div>
          );
        })}
      </div>
      {errorMessage && (
        <div className="error-message text-danger text-center">
          {errorMessage}
        </div>
      )}
      <div className="chat-form py-3 ps-4 pe-1 position-relative">
        <TextareaAutosize
          className="form-control"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxRows={15}
          placeholder="输入消息，可使用ctrl+回车发送"
        />
        <Button
          type="button"
          variant="success"
          className="send-button"
          onClick={handleSubmit}
          disabled={isAnswering || !input}
        >
          发送
        </Button>
      </div>
    </div>
  );
}

export default Chat;
