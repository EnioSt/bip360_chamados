import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  margin: 8px 0;
  font-weight: 500;
  color: #003366;
`;

const Select = styled.select`
  padding: 13.6px;
  font-size: 1em;
  border: 2px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #003366;
  }
`;

const SelectInput = ({ htmlFor, value, onChange, children }) => {
  return (
    <Wrapper>
      <Label htmlFor={htmlFor}>{htmlFor}</Label>
      <Select id={htmlFor} value={value} onChange={onChange}>
        {children}
      </Select>
    </Wrapper>
  );
};

export default SelectInput;
