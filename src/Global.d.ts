declare module "*.module.scss";
declare interface modules {
   modules: {
    path: string
    jsPath: string
    cssPath: string
    }[]
  }

declare type  customWindow = Window & modules

