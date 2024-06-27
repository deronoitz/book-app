/**
 * This file is defining the request function. In this case I use simple fetch API
 * But in the future, this file can also handle the request interceptors, error handling, etc.
 * 
 */

const fetcher = async (...args: Parameters<typeof fetch>): Promise<any> => {
  const response = await fetch(...args);
  return response.json();
};

export default fetcher