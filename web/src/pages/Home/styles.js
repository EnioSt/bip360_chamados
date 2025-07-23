import styled from "styled-components";
import Fundo from "../../assets/bip.png";

export const Container = styled.div`
  background-image: url(${Fundo});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: black;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.85);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white;
`;
