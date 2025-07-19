import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './TxHistory.module.scss'

function TxHistory() {
    const [selectedFilter, setSelectedFilter] = useState('All')
    // const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [itemsPerPageCount, setItemsPerPageCount] = useState(10)
    const user = useSelector((state) => state.user.user)

    // Mock data cho transaction history
    const transactionList = [
        {
            orderId: '#15267',
            transactionDate: 'Mar 1, 2023',
            transactionAmount: 100,
            questionCount: 1,
            transactionStatus: 'Success',
        },
        {
            orderId: '#153587',
            transactionDate: 'Jan 26, 2023',
            transactionAmount: 300,
            questionCount: 3,
            transactionStatus: 'Success',
        },
        {
            orderId: '#12436',
            transactionDate: 'Feb 12, 2023',
            transactionAmount: 100,
            questionCount: 1,
            transactionStatus: 'Success',
        },
        {
            orderId: '#16879',
            transactionDate: 'Feb 12, 2023',
            transactionAmount: 500,
            questionCount: 5,
            transactionStatus: 'Success',
        },
        {
            orderId: '#16378',
            transactionDate: 'Feb 28, 2023',
            transactionAmount: 500,
            questionCount: 5,
            transactionStatus: 'Rejected',
        },
        {
            orderId: '#16609',
            transactionDate: 'March 13, 2023',
            transactionAmount: 100,
            questionCount: 1,
            transactionStatus: 'Success',
        },
        {
            orderId: '#16907',
            transactionDate: 'March 18, 2023',
            transactionAmount: 100,
            questionCount: 1,
            transactionStatus: 'Pending',
        },
    ]

    const filterOptions = ['All', 'Complete', 'Pending', 'Rejected']

    const getStatusStyleClass = (status) => {
        switch (status) {
            case 'Success':
                return styles.transactionStatusSuccess
            case 'Pending':
                return styles.transactionStatusPending
            case 'Rejected':
                return styles.transactionStatusRejected
            default:
                return ''
        }
    }

    const filteredTransactionList =
        selectedFilter === 'All'
            ? transactionList
            : transactionList.filter((transaction) => {
                  if (selectedFilter === 'Complete')
                      return transaction.transactionStatus === 'Success'
                  return transaction.transactionStatus === selectedFilter
              })

    return (
        <div className={styles.transactionHistoryPage}>
            {/* Left Sidebar */}
            <div className={styles.navigationSidebar}>
                <div className={styles.navigationItem}>
                    <span className={styles.navigationIcon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-headset-icon lucide-headset"
                        >
                            <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
                            <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
                        </svg>
                    </span>
                    <span className={styles.navigationText}>Chat</span>
                    <span className={styles.navigationArrow}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-right-icon lucide-chevron-right"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                </div>
                <div className={styles.navigationItem}>
                    <span className={styles.navigationIcon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-phone-icon lucide-phone"
                        >
                            <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                        </svg>
                    </span>
                    <span className={styles.navigationText}>Call</span>
                    <span className={styles.navigationArrow}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-right-icon lucide-chevron-right"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                </div>
                <div className={styles.navigationItem}>
                    <span className={styles.navigationIcon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                        </svg>
                    </span>
                    <span className={styles.navigationText}>Questions</span>
                    <span className={styles.navigationArrow}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-right-icon lucide-chevron-right"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
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
                        <div className={styles.earningsAmount}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                <path d="M12 18V6" />
                            </svg>
                            <span>{user.payment || 1172.0}</span>
                        </div>
                        <div className={styles.earningsDate}>
                            as of{' '}
                            {new Date().toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                    <div className={styles.pendingPaymentsCard}>
                        <h3>Pending Payments</h3>
                        <div className={styles.earningsAmount}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                <path d="M12 18V6" />'
                            </svg>
                            <span>{user.payment || 320.0}</span>
                        </div>
                        <div className={styles.earningsDate}>
                            as of{' '}
                            {new Date().toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>

                {/* Payment History Section */}
                <div className={styles.paymentHistorySection}>
                    <h2 className={styles.paymentHistoryTitle}>Payment History</h2>

                    {/* Filter Tabs */}
                    <div className={styles.filterTabsContainer}>
                        {filterOptions.map((filterOption) => (
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
                                        <td
                                            className={getStatusStyleClass(
                                                transaction.transactionStatus,
                                            )}
                                        >
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
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                            <div className={styles.pageInfoDisplay}>
                                <span>1 of 1 pages</span>
                                <div className={styles.pageNavigationArrows}>
                                    <button className={styles.pageNavigationButton} disabled>
                                        ←
                                    </button>
                                    <button className={styles.pageNavigationButton} disabled>
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TxHistory
