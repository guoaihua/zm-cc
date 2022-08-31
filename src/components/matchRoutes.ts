import { loadScript, loadStyle } from "@utils/index";

let currentRoute: {path?: string, jsPath?: string, cssPath?: string} = {
  
}

const matchRoutes = (event) => {
  const modules = (window as unknown as customWindow).modules;
  if (!modules) {
    // 未匹配到直接返回
    return;
  }
  const name = window.location.pathname;
  const match = modules?.find((i) => name.includes(i?.path));
  const taskQueue = [];

  // 路由和当前一致，不刷新页面
  if(match.path === currentRoute?.path){
    return
  }

  // 卸载之前的modules 
  if(currentRoute.path){
    const jsEle = document.querySelector(`#${currentRoute.jsPath.match(/\w+/)?.[0]}`);
     jsEle?.parentElement?.removeChild(jsEle)
     const cssEle = document.querySelector(`#${currentRoute.cssPath.match(/\w+/)?.[0]}`);
     cssEle?.parentElement?.removeChild(cssEle)
     console.log(`module ${jsEle}-${cssEle} remove success`);
  }


  if (match) {
    currentRoute = match
    match.jsPath && taskQueue.push(loadScript({url: match.jsPath, id: match.jsPath.match(/\w+/)?.[0]}));
    match.cssPath && taskQueue.push(loadStyle({url: match.cssPath, id: match.cssPath.match(/\w+/)?.[0]}));
  }


  Promise.all(taskQueue).then((res) => {
    console.log('module load success');
    // const url = `${window.location.pathname}${window.location.search}`;
    // window.history.pushState(event.state, document.title, url);
  }).catch(e =>{
    console.log(`module ${currentRoute} load  failed`)
  })
};

export default matchRoutes;
