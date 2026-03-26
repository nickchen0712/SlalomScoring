// 請替換為你剛剛最新部署的 GAS Web App URL
const GAS_URL = "https://script.google.com/macros/s/AKfycbzmRAIy1H9RC8Mt1Js-0x8tNhPux2Sa4r5UwsvC4EFDIhwvCzGJIU8a3YewxchaPUeMTQ/exec";

// 封裝 GET 請求
async function apiGet(action, params = {}) {
  const url = new URL(GAS_URL);
  url.searchParams.append('action', action);
  for (let key in params) {
    url.searchParams.append(key, params[key]);
  }
  const response = await fetch(url);
  return await response.json();
}

// 封裝 POST 請求 (使用 text/plain 繞過 CORS preflight)
async function apiPost(action, payload) {
  payload.action = action;
  const response = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  return await response.json();
}
