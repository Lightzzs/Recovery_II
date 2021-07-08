using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.ViewModel
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "'email' obrigatório")]
        public string email { get; set; }

        [Required(ErrorMessage = "'senha' obrigatório")]
        public string senha { get; set; }
    }
}
