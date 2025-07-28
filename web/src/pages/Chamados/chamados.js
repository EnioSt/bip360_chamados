import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - 130px);
  display: flex;
  justify-content: center;
  padding: 40px 0;
  background-color: #f4f4f4;
  overflow-x: hidden;
`;

export const Content = styled.div`
  display: flex;
  gap: 32px;
  width: 95%;
  max-width: 1400px;
  height: 100%; /* ✅ ocupa toda a altura do Container */

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto; /* permite crescimento em telas pequenas */
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 24px;
  color: #003366;
`;

export const FormSection = styled.div`
  flex: 1;
  background-color: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const CardSection = styled.div`
  flex: 2;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  max-height: 678px;
  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(380px, 1fr)
  ); /* ✅ mais espaço por card */
  gap: 24px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

export const SelectDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;

  @media (max-width: 740px) {
    flex-direction: column;
    gap: 0;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
