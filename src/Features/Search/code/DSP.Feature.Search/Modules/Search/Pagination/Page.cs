namespace DSP.Feature.Search.Modules.Search.Pagination
{
    public class Page
    {
        public Page(int pageNumber, bool isActive, string link)
        {
            this.PageNumber = pageNumber;
            this.IsActive = isActive;
            this.Link = link;
            this.ShowMore = false;
        }

        public Page()
        {
            this.ShowMore = true;
        }

        public int PageNumber { get; set; }

        public bool IsActive { get; set; }

        public bool ShowMore { get; set; }

        public string Link { get; set; }
    }
}