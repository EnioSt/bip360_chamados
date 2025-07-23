import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #003366;
  padding: 16px;
  color: white;
  font-size: 0.9rem;
  text-align: center;

  @media (max-width: 600px) {
    padding: 12px;
    font-size: 0.8rem;
  }
`;
