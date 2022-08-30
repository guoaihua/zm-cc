// @ts-nocheck
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";
const container = document.getElementById('app');
const root = createRoot(container!);
import { loadScript, loadStyle } from "./utils/index";
import "tailwindcss/tailwind.css"


type a = Window & {
    modules: {
        path: string
        jsPath: string
        cssPath: string
    }[]
}

const fn = ()=>{
    const _historyWrap = function(type: 'pushState' | 'replaceState') {
        const orig = history[type];
        const e = new Event(type);
        return function() {
            console.log(arguments, orig)
          const rv = orig.apply(this, arguments);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _historyWrap('pushState');
      history.replaceState = _historyWrap('replaceState');
      window.addEventListener('pushState', function(e) {
        console.log('change pushState');
      });
      window.addEventListener('replaceState', function(e) {
        console.log('change replaceState');
      });
      window.addEventListener('popstate', function(event){
          console.log(event)
        const url = `${window.location.pathname}${window.location.search}`
        window.history.pushState(event.state,document.title, url )
      })
}

const App = ()=>{
    useEffect(()=>{

        fn()

        console.log('app is render')
        console.log((window as unknown as a ).modules)

        const modules = (window as unknown as a ).modules
        if(!modules){
            return
        }
        const name = window.location.pathname
        const match = modules.find(i=> name.includes(i?.path))
        const taskQueue = []
        if(match){
            match.jsPath && taskQueue.push(loadScript(match.jsPath))
            match.cssPath && taskQueue.push(loadStyle(match.cssPath))
        }
        Promise.all(taskQueue).then((res)=>{
            console.log(res)
        })

    },[])
   return  (
   <div id="subContainer">
  </div>)
}

export  const renderFn = (app: any)=>{
    console.log(app)
    const container = document.getElementById('subContainer');
    createRoot(container!).render(app)
}


root.render(
    <>
    <div className="w-full h-full">
        <div className="w-40 h-40 bg-blue-400 text-green-200">
                aaa
        </div>
    </div>
    <hr />  
    <App />
</>);


