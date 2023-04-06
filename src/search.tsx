import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { BsSearch } from "react-icons/bs";
import RenderMessage from "./render_message";
import { SearchApi } from "./consts";

function Search() {
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    setIsSearching(true);
    setAnswer("");
    setErrorMessage("");
    try {
      const response = await fetch(SearchApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let curr = "";
      let result = null;
      do {
        // eslint-disable-next-line no-await-in-loop
        result = await reader.read();
        const partText = decoder.decode(result.value);
        curr += partText;
        setAnswer(curr);
      } while (result && !result.done);
    } catch (error) {
      setErrorMessage(`出错了: ${error}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search">
      <InputGroup className="mb-5">
        <Form.Control
          placeholder="流浪地球2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="button"
          variant="success"
          onClick={handleSubmit}
          disabled={isSearching || !input}
        >
          <BsSearch />
        </Button>
      </InputGroup>

      {errorMessage && (
        <div className="error-message text-danger text-center">
          {errorMessage}
        </div>
      )}

      {isSearching && !answer ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <RenderMessage text={answer} uuid="search-result" defaultEnableMd />
      )}
    </div>
  );
}

export default Search;
