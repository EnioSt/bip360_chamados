import styled from "styled-components";

export const Container = styled.section`
  width: 95%; /* ✅ ocupa quase toda a largura da tela */
  max-width: 1600px; /* ✅ limite para telas grandes */
  margin: 40px auto;
  padding: 48px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const Header = styled.div`
  margin-bottom: 24px;

  h2 {
    font-size: 2rem;
    color: #003366;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 8px;
    color: #333;
  }

  h4 {
    font-size: 1rem;
    margin-top: 4px;
    color: #666;
  }
`;

export const InfoBlock = styled.div`
  margin-bottom: 32px;

  h5 {
    font-size: 1.1rem;
    margin-bottom: 12px;
    color: #003366;
  }
`;

export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SubTitle = styled.h5`
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #003366;
`;

export const Paragraph = styled.p`
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: #333;

  b {
    color: #003366;
  }
`;
