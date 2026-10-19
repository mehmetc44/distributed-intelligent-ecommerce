using Yarp.ReverseProxy.Configuration;

namespace ApiGateway.Filters;

public class CustomProxyConfigFilter : IProxyConfigFilter
{
    public ValueTask<RouteConfig> ConfigureRouteAsync(RouteConfig route, ClusterConfig? cluster, CancellationToken cancel)
    {
        return ValueTask.FromResult(route);
    }

    public ValueTask<ClusterConfig> ConfigureClusterAsync(ClusterConfig cluster, CancellationToken cancel)
    {
        return ValueTask.FromResult(cluster);
    }
}
