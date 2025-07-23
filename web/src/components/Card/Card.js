import styled from "styled-components";

export const CardWrapper = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: #003366;
  }

  h3,
  h4 {
    margin: 4px 0;
    color: #555;
  }

  p {
    margin: 8px 0;
    color: #333;
    font-size: 0.95rem;
  }

  button {
    margin-top: 12px;
  }
`;
