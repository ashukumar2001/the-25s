import styled from "@emotion/styled";
import { Avatar, Paper, Stack } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Player, RootState } from "../../redux/reducers";
import { getNameInitials } from "../../utils/helpers";
const HeaderContainer = styled(Paper)`
  display: inline-block;
  width: calc(100% - 16px);
  margin: 0 auto 1rem;
  border-radius: 2rem;
  padding: 0.5rem 0.5rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const CustomAvatar = styled(Avatar)`
  height: 36px;
  width: 36px;
  font-size: 1rem;
  border: 2px solid #727272;
  background: rgba(0, 0, 0, 0.71);
  color: #fff;
  text-transform: uppercase;
`;

const Header = () => {
  const players: Array<Player> = useSelector(
    (state: RootState) => state.Game?.currentGame?.players
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!players) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);
  return (
    <>
      <HeaderContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {players &&
            players.length > 0 &&
            players.map((player) => {
              const { playerId, playerName } = player;
              const nameInitials = getNameInitials(playerName);
              return (
                <CustomAvatar key={playerId} title={playerName}>
                  {nameInitials}
                </CustomAvatar>
              );
            })}
        </Stack>
      </HeaderContainer>
    </>
  );
};

export default Header;
