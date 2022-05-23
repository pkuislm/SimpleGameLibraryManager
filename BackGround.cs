using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleGameLibraryManager
{
    public class BackGrounds
    {
        static public Dictionary<int, GameInfo> lib = new Dictionary<int, GameInfo>();
        public static uint MurmurHash2(byte[] data) => MurmurHash2(data, 0);

        public static uint MurmurHash2(byte[] data, uint seed)
        {
            // https://github.com/abrandoned/murmur2/blob/master/MurmurHash2.c
            const uint m = 0x5bd1e995;
            const int r = 24;

            int len = data.Length;
            uint h = seed ^ (uint)len;

            int index = 0;
            while (len >= 4)
            {
                uint k = BitConverter.ToUInt32(data, index);

                k *= m;
                k ^= k >> r;
                k *= m;

                h *= m;
                h ^= k;

                index += 4;
                len -= 4;
            }

            if (len != 0)
            {
                if (len > 2)
                {
                    h ^= (uint)(data[index + 2] << 16);
                }
                if (len > 1)
                {
                    h ^= (uint)(data[index + 1] << 8);
                }
                h ^= data[index];
                h *= m;
            }

            h ^= h >> 13;
            h *= m;
            h ^= h >> 15;

            return h;
        }
    }
    

    public class GameInfo
    {
        public string m_name { get; set; }
        public string? m_brand { get; set; }
        public string []? m_tags { get; set; }
        public string? m_description { get; set; }
        public long m_size { get; set; }
        public string m_path { get; set; }
        public long? m_time { get; set; }
        public long? m_lastOpenedTime { get; set; }
        public string? m_execPath { get; set; }

        public GameInfo(string path)
        {
            m_name = "";
            m_path = path;
            m_size = 0;
            ScanDir();
        }
        public int ScanDir()
        {
            m_size = GetDirectoryLength(m_path);
            string[] files = Directory.GetFiles(m_path, "*.", SearchOption.TopDirectoryOnly);
            if(files != null)
            {
                m_name = Path.GetFileName(files[0]);
            }
            else
            {
                m_name = "";
            }
            files = Directory.GetFiles(m_path, "*.exe", SearchOption.TopDirectoryOnly);
            if (files != null)
            {
                m_execPath = files[0];
            }
            else
            {
                m_execPath = "";
            }
            return 0;
        }

        static long GetDirectoryLength(string dirPath)
        {
            if (!Directory.Exists(dirPath))
                return 0;
            long len = 0;
            DirectoryInfo di = new DirectoryInfo(dirPath);
            foreach (FileInfo fi in di.GetFiles())
            {
                len += fi.Length;
            }
            DirectoryInfo[] dis = di.GetDirectories();
            if (dis.Length > 0)
            {
                for (int i = 0; i < dis.Length; i++)
                {
                    len += GetDirectoryLength(dis[i].FullName);
                }
            }
            return len;
        }
    }
}
