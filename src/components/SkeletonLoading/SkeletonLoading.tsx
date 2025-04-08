import styles from './SkeletonLoading.module.css'

const SkeletonLoading = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonTextLine} />
      <div className={styles.skeletonTextLine} />
      <div className={`${styles.skeletonTextLine} ${styles.short}`} />
      <div className={`${styles.skeletonTextLine} ${styles.ultraShort}`} />
      <div className={`${styles.skeletonTextLine} ${styles.ultraShort}`} />
      <div className={styles.skeletonImg}></div>
      <div className={`${styles.skeletonTextLine} ${styles.short}`} />
      <div className={styles.skeletonTextLine} />
      <div className={styles.skeletonTextLine} />
      <div className={`${styles.skeletonTextLine} ${styles.short}`} />
      <div className={styles.skeletonTextLine} />
      <div className={styles.skeletonTextLine} />
      <div className={`${styles.skeletonTextLine} ${styles.short}`} />
      <div className={styles.skeletonTextLine} />
      <div className={styles.skeletonTextLine} />
      <div className={`${styles.skeletonTextLine} ${styles.short}`} />
    </div>
  )
}
export default SkeletonLoading;