import React from 'react';
import { Link } from 'react-router-dom';

const ContentHeader = ({ title, breadcrumbs = [] }) => {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-sm-6 ">
                        <h5 className='mb-0'>{title}</h5>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            {breadcrumbs.map((item, index) => (
                                <li key={index} className="breadcrumb-item">
                                    {item.to ? (
                                        <Link to={item.to}>{item.label}</Link>
                                    ) : (
                                        item.label
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;
