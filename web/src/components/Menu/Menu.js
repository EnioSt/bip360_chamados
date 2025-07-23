import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #003366;
  padding: 16px 32px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const Logo = styled.img`
  height: 40px;
`;

export const Nav = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;

  &:hover {
    text-decoration: underline;
  }
`;
