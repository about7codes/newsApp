import React from 'react';
import Head from 'next/head';
import { Toolbar } from '../components/toolbar';
import styles from '../styles/EOM.module.css';

const EOM = ({ employee }) => {
    return (
        <>
            <Head>
                <title>Random employee Of The Month</title>
                <meta
                name="description"
                content={`This month's employee of the month is ${employee.name}`}
                />

                <meta property="og:image" content={employee.image} />
                <meta property="og:title" content="Employee Of The Month" />
                <meta
                property="og:description"
                content={`This month's employee of the month is ${employee.name}`}
                />

                <meta property="twitter:image" content={employee.image} />
                <meta property="twitter:title" content="Employee Of The Month" />
                <meta
                property="twitter:description"
                content={`This month's employee of the month is ${employee.name}`}
                />
            </Head>
            <div className='page-container'>
                <Toolbar />
                <div className={styles.main}>
                    <h1>Random employee of the month</h1>
                    <div className={styles.employeeOfTheMonth}>
                        <h3>{employee.name}</h3>
                        <h6>{employee.position}</h6>
                        <img src={employee.image} alt="employee" />
                        <p>{employee.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (pageContext) => {
    const res = await fetch('https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth');
    const employee = await res.json();

    return {
        props: {
            employee,
        }
    };
}


export default EOM;
