import { Box, Avatar, Typography, Tooltip, Button } from "@mui/material";

const ChatHeader = ({ user }) => {
  const { name, profileImage, status } = user;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          height: "58px",
          background: "#040046",
        }}
      >
        <Tooltip title="Profile">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button>
              <Avatar xs={{ background: "gray" }} src={profileImage}>
                {name}
              </Avatar>

              <Box className="chat-header-name">
                <Typography component={"span"}>{name}</Typography>
                <Typography component={"p"} lineHeight="0.5" fontSize="10px">
                  {"online"}
                </Typography>
              </Box>
            </Button>
          </Box>
        </Tooltip>
        <Typography sx={{ minWidth: 100 }}>menu</Typography>
      </Box>
    </>
  );
};
export default ChatHeader;
