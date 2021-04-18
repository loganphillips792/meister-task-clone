/**
 * Note: I was getting an error here because over in index.tsx, it said I was only passing in 0 parameters and I needed 1. Looks like I didn't have
 * the most up to date code for this file. I went to https://github.com/facebook/create-react-app/blob/master/packages/cra-template-typescript/template/src/reportWebVitals.ts 
 * and copied that here which fixed the issue. Old code is commented out below
 */

/**
 * const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
 */

 import { ReportHandler } from 'web-vitals';

 const reportWebVitals = (onPerfEntry?: ReportHandler) => {
   if (onPerfEntry && onPerfEntry instanceof Function) {
     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
       getCLS(onPerfEntry);
       getFID(onPerfEntry);
       getFCP(onPerfEntry);
       getLCP(onPerfEntry);
       getTTFB(onPerfEntry);
     });
   }
 };
 
 export default reportWebVitals;