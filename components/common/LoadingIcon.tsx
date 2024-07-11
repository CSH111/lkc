import React from "react";
import styled from "styled-components";

export default function LoadingIcon(props: {
  className?: string;
  size?: string | number;
  color?: string;
}) {
  return (
    <Container className={props.className}>
      <img src="loading.png" alt="loading" />
    </Container>
  );
}

const Container = styled("span")`
  width: 50px;
  img {
    width: 50px;
    animation: spin 1s ease-in-out infinite;
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
