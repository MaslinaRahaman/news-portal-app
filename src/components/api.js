import fetch from "fetch"

export async function getData(){
    const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=69d66e4e9a3e4ce4a6cad2068c1dc33b`
      );
      return res;
    
}