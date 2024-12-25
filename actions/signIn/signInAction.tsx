const signIn = (password: string) => {
  if (typeof password !== "string") return;

  if (password === process.env.NEXT_PUBLIC_HIDDEN_PASSWORD) {
    const now = new Date();
    now.setDate(now.getDate() + 3);

    document.cookie = `authToken=your_auth_token_value; expires=${now.toUTCString()}; path=/; secure; SameSite=Strict`;
  }
};

export default signIn;
