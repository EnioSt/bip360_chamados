import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { api } from "../../services/api.js";

const AutoCompleteInput = ({
  endpoint,
  value,
  onChange,
  htmlFor,
  children,
}) => {
  const [sugestoes, setSugestoes] = useState([]);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, sugestoes.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      onChange({ target: { value: sugestoes[selectedIndex] } });
      setSugestoes([]);
      setSelectedIndex(-1);
    }
  };

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSugestoes([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSugestoes = async () => {
      if (query.length < 1) return;
      try {
        const res = await api.get(endpoint, {
          params: { query },
        });
        setSugestoes(res.data);
      } catch (err) {
        console.error("Erro ao buscar sugestões", err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSugestoes();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, endpoint]);

  return (
    <StyledWrapper>
      <div ref={wrapperRef} className="inputGroup">
        <input
          required
          autoComplete="off"
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e);
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor={htmlFor}>{children}</label>
        {sugestoes.length > 0 && (
          <ul className="suggestions">
            {sugestoes.map((item, index) => (
              <li
                key={index}
                className={index === selectedIndex ? "selected" : ""}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  onChange({ target: { value: item } });
                  setSugestoes([]);
                  setSelectedIndex(-1);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .inputGroup {
    font-family: "Segoe UI", sans-serif;
    margin: 1em 0;
    width: 100%;
    position: relative;
  }

  .inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
  }

  .inputGroup label {
    font-size: 100%;
    position: absolute;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #003366;
  }

  .inputGroup :is(input:focus, input:valid) ~ label {
    transform: translateY(-50%) scale(0.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: white;
  }

  .inputGroup :is(input:focus, input:valid) {
    border-color: #003366;
  }

  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 0 0 10px 10px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .suggestions li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .suggestions li.selected {
    background-color: #eee;
  }

  .suggestions li:hover {
    background-color: #f0f0f0;
  }
`;

export default AutoCompleteInput;
