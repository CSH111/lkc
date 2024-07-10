import styled from "styled-components";
import Image from "next/image";
function Header(props: { title?: string }) {
  return (
    <HeaderContainer>
      <h2>{props.title}</h2>
      <Image src={"bell.svg"} width={25} height={25} alt="bell_img" />
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 25px;
    font-weight: bold;
  }
`;
