export function formatDataUserFromServer(dataUser) {
  return {
    access_token: dataUser.access_token,
    expires_in: dataUser.expires_in,
    token_type: dataUser.token_type,
    user: formatUser(dataUser.user),
  };
}

function formatUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.displayName,
    email_verified_at: user.email_verified_at,
    updated_at: user.updated_at,
  };
}
