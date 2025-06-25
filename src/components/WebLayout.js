

import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
export default function Layout({ children }) {
    return (
        <div>
            <WebHeader />
          
                <div className="content-wrapper m-0" >
                    {children}
                </div>
           
            <WebFooter />
        </div>
    );
}
