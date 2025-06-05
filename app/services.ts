interface DispatchCallParams {
  phone_number: string;
  prompt: string;
  name: string;
}

export const dispatchCall = async (params: DispatchCallParams) => {
  const response = await fetch("https://api.urmi.ai/dispatch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });

  if (!response.ok) {
    throw new Error(`Server responded error ${response}`);
  }

  return response.json();
};
