using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiContoller : ControllerBase
    {
        private IMediator _mediator;
        
        //This will be used in derived class to call query
        protected IMediator Mediator => _mediator??=HttpContext.RequestServices.GetService<IMediator>();

    }
}
