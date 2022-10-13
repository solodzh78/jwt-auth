export const responseDTO = (res) => {
    const {accessToken, user} = res;
    return {accessToken, user};
}

