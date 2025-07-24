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
  background-color: #121316;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.85);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white;
`;
