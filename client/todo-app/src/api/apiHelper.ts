const BASE_URL = "http://localhost:3001/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
    method: RequestMethod;
    body?: any;
    headers?: Record<string, string>;
}

const apiRequest = async (endpoint: string, options: RequestOptions) => {
    const { method, body, headers } = options;
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(headers || {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// API methods
export const apiGet = async (endpoint: string, token: string | null) => {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {};
    return apiRequest(endpoint, { method: "GET", headers });
};

export const apiPost = async (
    endpoint: string,
    body: any,
    token?: string | null
) => {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {};
    return apiRequest(endpoint, { method: "POST", body, headers });
};

export const apiPut = async (
    endpoint: string,
    body: any,
    token: string | null
) => {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {};
    return apiRequest(endpoint, { method: "PUT", body, headers });
};

export const apiDelete = async (endpoint: string, token: string | null) => {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {};
    return apiRequest(endpoint, { method: "DELETE", headers });
};
