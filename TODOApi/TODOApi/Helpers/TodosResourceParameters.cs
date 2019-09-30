using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TODOSApi.Helpers
{
    /// <summary>
    /// clase de manejo de los parametros del llamado a la API
    /// </summary>
    public class TodosResourceParameters
    {
        /// <summary>
        /// maximo tamaño de pagina
        /// </summary>
        const int maxPageSize = 20;

        /// <summary>
        /// nupero de pagina por defecto
        /// </summary>
        public int PageNumber { get; set; } = 1;

        /// <summary>
        /// tamaño de pagina por defecto
        /// </summary>
        private int _pageSize = 10;


        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }

        #region Fields para filtrado

        public long Id { get; set; }
        
        public string Descripcion { get; set; }
        
        public string Estado { get; set; }

        #endregion

    }
}
