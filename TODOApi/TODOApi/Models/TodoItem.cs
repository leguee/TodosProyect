using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TODOApi.Models
{
    public class TodoItem
    {
        public long ID { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string UrlArchivo { get; set; }
    }
}
