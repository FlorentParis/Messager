<?php

namespace App\Controller;

use App\Repository\MessageRepository;
use App\Repository\ChannelRepository;
use App\Entity\Channel;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class ChannelController extends AbstractController
{
    #[Route('/channel', name: 'channel')]
    public function getChannels(ChannelRepository $channelRepository): Response
    {
        $channels = $channelRepository->findAll();

        return $this->json([
            'channels' => $channels ?? []
        ]);
    }

    #[Route('/channelByUsersId/{user1}&{user2}', name: 'channel')]
    public function getChannelByUsersId(ChannelRepository $channelRepository, User $user1, User $user2, SerializerInterface $serializer)
    {
        $users_id = array($user1->getId() , $user2->getId());
        sort($users_id);
        $ids = $users_id[0] . $users_id[1];
        // $channel = $channelRepository->find(1);
        $channel = $channelRepository->findByUsersId($ids);

        // $context = (new ObjectNormalizerContextBuilder())
        //     ->withGroups('channelByUser')
        //     ->toArray();

        // return $serializer->normalize($channel, null, ['groups' => 'channelByUser']);

        return $this->json([
            'channel' => $serializer->normalize($channel, null, ['groups' => 'channelByUser'])
        ]);
    }
}
