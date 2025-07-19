import React, { useState } from 'react';
import * as styles from './TxHistory.module.scss';

function TxHistory() {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [itemsPerPageCount, setItemsPerPageCount] = useState(10);

    // Mock data cho transaction history
    const transactionList = [
        { orderId: '#15267', transactionDate: 'Mar 1, 2023', transactionAmount: 100, questionCount: 1, transactionStatus: 'Success' },
        { orderId: '#153587', transactionDate: 'Jan 26, 2023', transactionAmount: 300, questionCount: 3, transactionStatus: 'Success' },
        { orderId: '#12436', transactionDate: 'Feb 12, 2023', transactionAmount: 100, questionCount: 1, transactionStatus: 'Success' },
        { orderId: '#16879', transactionDate: 'Feb 12, 2023', transactionAmount: 500, questionCount: 5, transactionStatus: 'Success' },
        { orderId: '#16378', transactionDate: 'Feb 28, 2023', transactionAmount: 500, questionCount: 5, transactionStatus: 'Rejected' },
        { orderId: '#16609', transactionDate: 'March 13, 2023', transactionAmount: 100, questionCount: 1, transactionStatus: 'Success' },
        { orderId: '#16907', transactionDate: 'March 18, 2023', transactionAmount: 100, questionCount: 1, transactionStatus: 'Pending' },
    ];

    const filterOptions = ['All', 'Complete', 'Pending', 'Rejected'];

    const getStatusStyleClass = (status) => {
        switch (status) {
            case 'Success': return styles.transactionStatusSuccess;
            case 'Pending': return styles.transactionStatusPending;
            case 'Rejected': return styles.transactionStatusRejected;
            default: return '';
        }
    };

    const filteredTransactionList = selectedFilter === 'All' 
        ? transactionList 
        : transactionList.filter(transaction => {
            if (selectedFilter === 'Complete') return transaction.transactionStatus === 'Success';
            return transaction.transactionStatus === selectedFilter;
        });

    return (
        <div className={styles.transactionHistoryPage}>
            {/* Left Sidebar */}
            <div className={styles.navigationSidebar}>
                <div className={styles.navigationItem}>
                    <span className={styles.navigationIcon}>💬</span>
                    <span className={styles.navigationText}>Chat</span>
                    <span className={styles.navigationArrow}>→</span>
                </div>
                <div className={styles.navigationItem}>
                    <span className={styles.navigationIcon}>📞</span>
                    <span className={styles.navigationText}>Call</span>
                    <span className={styles.navigationArrow}>→</span>
                </div>
                <div className={styles.navigationItem}>
                    <span className={styles.navigationIcon}>📄</span>
                    <span className={styles.navigationText}>Questions</span>
                    <span className={styles.navigationArrow}>→</span>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContentArea}>
                {/* Blue line at top */}
                <div className={styles.topBorderLine}></div>

                {/* Earnings Summary */}
                <div className={styles.earningsSummarySection}>
                    <div className={styles.totalEarningsCard}>
                        <h3>Total Earnings</h3>
                        <div className={styles.earningsAmount}>₹430.00</div>
                        <div className={styles.earningsDate}>as of 01-December 2022</div>
                    </div>
                    <div className={styles.pendingPaymentsCard}>
                        <h3>Pending Payments</h3>
                        <div className={styles.earningsAmount}>₹100.00</div>
                        <div className={styles.earningsDate}>as of 01-December 2022</div>
                    </div>
                </div>

                {/* Payment History Section */}
                <div className={styles.paymentHistorySection}>
                    <h2 className={styles.paymentHistoryTitle}>Payment History</h2>
                    
                    {/* Filter Tabs */}
                    <div className={styles.filterTabsContainer}>
                        {filterOptions.map(filterOption => (
                            <button
                                key={filterOption}
                                className={`${styles.filterTabButton} ${selectedFilter === filterOption ? styles.active : ''}`}
                                onClick={() => setSelectedFilter(filterOption)}
                            >
                                {filterOption}
                            </button>
                        ))}
                    </div>

                    {/* Transaction Table */}
                    <div className={styles.transactionTableCard}>
                        <table className={styles.transactionDataTable}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Total Questions</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactionList.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.orderId}</td>
                                        <td>{transaction.transactionDate}</td>
                                        <td>₹{transaction.transactionAmount}</td>
                                        <td>{transaction.questionCount}</td>
                                        <td className={getStatusStyleClass(transaction.transactionStatus)}>
                                            {transaction.transactionStatus}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className={styles.paginationContainer}>
                            <div className={styles.itemsPerPageSelector}>
                                <select 
                                    value={itemsPerPageCount} 
                                    onChange={(e) => setItemsPerPageCount(Number(e.target.value))}
                                >
                                    <option value={10}>10 per page</option>
                                    <option value={20}>20 per page</option>
                                    <option value={50}>50 per page</option>
                                </select>
                            </div>
                            <div className={styles.pageInfoDisplay}>
                                <span>1 of 1 pages</span>
                                <div className={styles.pageNavigationArrows}>
                                    <button className={styles.pageNavigationButton}>←</button>
                                    <button className={styles.pageNavigationButton}>→</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TxHistory;
