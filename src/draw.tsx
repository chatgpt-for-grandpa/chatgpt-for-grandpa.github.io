import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { DrawApi } from "./consts";

function Draw() {
  const [input, setInput] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    setIsDrawing(true);
    setInput("");
    setImage("");
    setErrorMessage("");
    try {
      const response = await fetch(DrawApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const url = await response.text();
      setImage(url);
    } catch (error) {
      setErrorMessage(`出错了: ${error}`);
    } finally {
      setIsDrawing(false);
      setInput(input);
    }
  };

  return (
    <div className="draw">
      <InputGroup className="mb-5">
        <Form.Control
          placeholder="一只虎背熊腰的神兽，3D，高清，大师级作品"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="button"
          variant="success"
          onClick={handleSubmit}
          disabled={isDrawing || !input}
        >
          📤
        </Button>
      </InputGroup>

      {errorMessage && (
        <div className="error-message text-danger text-center">
          {errorMessage}
        </div>
      )}

      {image && <Image src={image} fluid />}
    </div>
  );
}

export default Draw;
