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
  /* position: fixed;
  right: 0;
  top: 0;
  width: 100%; */
  /* height: 100px; */
  /* height: 70px;
  padding: 17.5px; */
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 25px;
    font-weight: bold;
  }
`;
