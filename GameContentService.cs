using NetDimension.NanUI.Resource.Data;
using NetDimension.NanUI.Browser.ResourceHandler;

namespace SimpleGameLibraryManager
{
    [DataRoute("/Game")]
    public class GameContentService : DataService
    {
        private int GetGamesCount()
        {
            return 114514;
        }

        [RoutePost("Contents/GetNum")]
        public ResourceResponse GetNum()
        {
            // 返回json
            return Json(new { success = true, num = GetGamesCount() });
        }
    }
}
