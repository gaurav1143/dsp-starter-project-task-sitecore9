namespace DSP.Business.Search.Paging
{
    public class PaginationOptions
    {
        public PaginationOptions()
            : this(1, 10)
        {
        }

        public PaginationOptions(int pageNumber, int pageSize)
        {
            PageSize = pageSize;
            PageNumber = pageNumber;
        }

        public int RecordsToSkipToStartOfPage()
        {
            return (PageNumber - 1) * PageSize;
        }

        public int TotalNumberOfPages(int totalNumberOfRecords)
        {
            return (totalNumberOfRecords + PageSize - 1) / PageSize;
        }

        private int pageSize;
        public int PageSize
        {
            get { return this.pageSize; }
            set
            {
                if (value < 1) value = 1;
                this.pageSize = value;
            }
        }

        private int pageNumber;
        public int PageNumber
        {
            get { return this.pageNumber; }
            set
            {
                if (value < 1) value = 1;
                this.pageNumber = value;
            }
        }
    }
}
