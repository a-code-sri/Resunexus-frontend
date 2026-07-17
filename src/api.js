const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function authHeaders() {
    const token = localStorage.getItem("access_token");

    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
}
export async function login(email, password) {

    const response = await fetch(`${API_BASE_URL}/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            email,
            password,
        }),
    });
    if(response.status===401){

        localStorage.removeItem("token");

        window.location.href="/login";

    }
    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    const data = await response.json();

    localStorage.setItem(
        "access_token",
        data.access_token
    );

    return data;
}
export async function register(email, password) {

    const response = await fetch(`${API_BASE_URL}/auth/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            email,
            password,
        }),
    });
    if(response.status===401){

        localStorage.removeItem("token");

        window.location.href="/login";

    }
    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return await response.json();
}
export async function logout() {

    const token = localStorage.getItem("access_token");

    if (token) {

        await fetch(`${API_BASE_URL}/auth/logout`, {

            method: "POST",

            headers: {
                ...authHeaders(),
            },
        });
    }

    localStorage.removeItem("access_token");
}


export async function uploadJD(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/upload_jd`, {
        method: "POST",
        body: formData,
        headers : {
            ...authHeaders(),
        }
    });
    if(response.status===401){

        localStorage.removeItem("token");

        window.location.href="/login";

    }
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to upload JD");
    }

    return await response.json();
}

export async function uploadCV(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/upload_cv`, {
        method: "POST",
        body: formData,
        headers:{
            ...authHeaders(),
        }
    });
    if(response.status===401){

        localStorage.removeItem("token");

        window.location.href="/login";

    }
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to upload CV");
    }

    return await response.json();
}


export async function getStatus() {
    const response = await fetch(`${API_BASE_URL}/status` , {
        headers : {
            ...authHeaders
        }
    });
    
    if (!response.ok) {
        throw new Error("Unable to fetch processing status");
    }

    return await response.json();
}

export async function getResults() {
    const response = await fetch(`${API_BASE_URL}/results` , {
        headers : {
            ...authHeaders(),
        }
    });
    if(response.status===401){

        localStorage.removeItem("token");

        window.location.href="/login";

    }
    if (!response.ok) {
        throw new Error("Unable to fetch results");
    }

    return await response.json();
}



export async function downloadResults() {

    const response = await fetch(`${API_BASE_URL}/download` , {
        headers : {
            ...authHeaders(),
        }
    });

    if (!response.ok) {
        throw new Error("Unable to download results");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Resume_Grading_Report.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
}