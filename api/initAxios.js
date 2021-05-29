import axios from "axios";
import Router from "next/router";
import merge from "lodash/merge";

import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";


const baseURL = "http://localhost:3005/api"

const codeMessage = {
    400: "請求錯誤",
    401: "登錄狀態失效，請重新登錄",
    403: "拒絕訪問",
    404: "請求資源不存在",
    500: "伺服器器無回應",
    502: "伺服器錯誤",
    503: "服務目前無法使用"
};


const requestStart = (config) => {
    config.loadingCallback(true);
    if (config.disabledAbort) return;

    removePending(config); // 請求開始前，移除之前發送出去的相同請求
    addPending(config); // 添加本次請求狀態到 pending 中
};

const requestSuccess = (response, config) => {
    removePending(config); // 在請求結束後，移除本次請求狀態

    let resData = Array.isArray(response.data)
        ? response.data
        : response.data.data;

    if (!resData) {
        resData = [];
    }

    if (config.successToast) {
        let toastMessage = typeof config.successToast === "string"
            ? config.successToast
            : response?.data?.message;
        if (!toastMessage || toastMessage.length > 150) {
            toastMessage = response?.data?.status || response.status || "API success.";
        }

        toast(<Alert variant="filled" severity="success">{toastMessage}</Alert>);
    }

    return {
        data: resData,
        status: response.status,
        isSuccess: true
    };
};
const requestFailed = (error, config) => {
    const { response, message } = error;

    if (axios.isCancel(error)) {
        // 取消請求的錯誤，直接跳過
        return {
            data: [],
            message: "cancel request: " + message,
            isSuccess: false
        };
    }

    if (config.errorToast) {
        let toastMessage = typeof config.errorToast === "string"
            ? config.errorToast
            : response?.data?.description;
        if (typeof toastMessage === "object") {
            toastMessage = JSON.stringify(toastMessage);
        }
        if (!toastMessage || toastMessage.length > 150) {
            toastMessage = response?.data?.message || message || "Server Error.";
        }

        toast(<Alert variant="filled" severity="error">{toastMessage}</Alert>);
    }

    if (response) {
        removePending(config); // 在請求結束後，移除本次請求狀態

        if (response.status === 401) {
            Router.push("/authorization/login");
        }

        return {
            data: response.data,
            status: response.status,
            message: message,
            isSuccess: false
        };
    }
    else {
        return {
            data: "Server Error",
            status: 400,
            message: "",
            isSuccess: false
        };
    }
};
const requestDone = (config) => {
    config.loadingCallback(false);
};

/**
 * @description 產生 cancel id
 * @param {Object} config
 */
const cancelIdGenerator = (config) => {
    // 若有帶自己產的 id 則用 id 作為 cancel token
    const cancelId = config.id ?? [
        config.method,
        config.url,
        JSON.stringify(config?.data)
    ].join("&");

    return cancelId;
};

// 聲明一個 Map 用於存儲每個請求的標識 和 取消函數
const pending = new Map();
/**
 * @description 添加請求狀態
 * @param {Object} config
 */
const addPending = (config) => {
    const cancelId = cancelIdGenerator(config);

    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pending.has(cancelId)) {
            // 如果 pending 中不存在當前請求，則添加進去
            pending.set(cancelId, cancel);
        }
    });
};
/**
 * @description 移除請求
 * @param {Object} config
 */
const removePending = (config) => {
    const cancelId = cancelIdGenerator(config);

    if (pending.has(cancelId)) {
        // 如果在 pending 中存在當前請求標識，需要取消當前請求，並且移除
        const cancel = pending.get(cancelId);
        cancel(cancelId);
        pending.delete(cancelId);
    }
};

const instance = axios.create({ baseURL });

/**
 * @param {Object} options axios 參數
 * @param {Function} [options.loadingCallback=()=>{}] loading 狀態 callback
 * @param {String|Boolean} [options.errorToast=true] api failed 顯示 toast 訊息
 * @param {string|Boolean} [options.successToast=false] api success 顯示 toast 訊息
 * @param {string|Boolean} [options.disabledAbort=false] 是否允許 clearPending() abort request
 * @param {String} [options.id=""] 自訂 request id，可以用在判斷是否需要 cancel 前一個 request
 * @return {Promise} Promise
 */
const request = (options) => {
    const config = merge({
        headers: {
            "Content-Type": "application/json"
        },
        errorToast: true,
        successToast: false,
        disabledAbort: false,
        id: null,
        loadingCallback: () => { }
    }, options);

    requestStart(config);

    return instance(config)
        .then((response) => requestSuccess(response, config))
        .catch((error) => requestFailed(error, config))
        .finally(() => requestDone(config));
};

const methods = {
    get: (url, options) => request({
        method: "GET",
        url,
        ...options
    }),
    post: (url, data, options) => request({
        method: "POST",
        url,
        data,
        ...options
    }),
    put: (url, data, options) => request({
        method: "PUT",
        url,
        data,
        ...options
    }),
    patch: (url, data, options) => request({
        method: "PATCH",
        url,
        data,
        ...options
    }),
    delete: (url, options) => request({
        method: "DELETE",
        url,
        ...options
    })
};

Object.entries(methods).forEach(([key, value]) => {
    request[key] = value;
});


export default methods;

/**
 * @description 清空 pending 中的請求（在路由跳轉時調用）
 */
export const clearPending = () => {
    for (const [cancelId, cancel] of pending) {
        cancel(cancelId);
    }
    pending.clear();
};
